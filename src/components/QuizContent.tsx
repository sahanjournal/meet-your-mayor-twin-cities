import { questionContent } from "../question-sample-content";
import { candidateMplsContent } from "../candidate-mpls-content";
import { candidateStpContent } from "../candidate-stp-content";
import { City, groupBy, kebabCase, useCity } from "../utils";

/**
 * This function takes our raw JSON content from `candidate-content.js`
 * and formats it into a organized JS object that keeps track of all
 * candidates' responses to quiz questions, with explanations.
 */
export const formatCandidateContent = (city: City | undefined) => {
  // Filter candidates by city:
  const candidates =
    city === "st-paul" ? candidateStpContent : candidateMplsContent;

  const splitCandidateInfo = (text: string) => text.split("|");

  return Object.values(candidates).map((candidate) => {
    const quizResponses = Object.entries(candidate)
      .filter(([key]) => key.startsWith("quizResponse"))
      .map(([, value]) => ({
        optionNumber: splitCandidateInfo(value)[0]?.trim(),
        quote: splitCandidateInfo(value)[1]?.trim(),
        source: splitCandidateInfo(value)[2]?.trim(),
      }));

    const quotes = Object.entries(candidate)
      .filter(([key]) => key.startsWith("quote"))
      .map(([, value]) => ({
        subject: splitCandidateInfo(value)[0]?.trim(),
        quote: splitCandidateInfo(value)[1]?.trim(),
        source: splitCandidateInfo(value)[2]?.trim(),
      }));

    return { responses: quizResponses, quotes, ...candidate };
  });
};

/**
 * This function can be used to test the formatting of the candidate content array.
 * For example: test to make sure each entry has no more than two `|` delimiters.
 *
 * TODO: Make this funciton more DRY by passing in the content to test as an argument.
 */
export const testCandidateContentFormat = () => {
  for (const outerKey in candidateMplsContent) {
    const innerObj =
      candidateMplsContent[outerKey as keyof typeof candidateMplsContent];
    for (const innerKey in innerObj) {
      const value = innerObj[innerKey as keyof typeof innerObj];
      const pipeCount = (value.match(/\|/g) || []).length;
      const noSpaceBeforeParenthesis = (value.match(/\S\(/) || []).length > 0;
      if (pipeCount > 2) {
        console.log(`Too many pipes in ${outerKey}.${innerKey}: "${value}"`);
      }
      if (noSpaceBeforeParenthesis) {
        console.log(
          `Improper parentesis spacing in ${outerKey}.${innerKey}: "${value}"`
        );
      }
    }
  }
  for (const outerKey in candidateStpContent) {
    const innerObj =
      candidateStpContent[outerKey as keyof typeof candidateStpContent];
    for (const innerKey in innerObj) {
      const value = innerObj[innerKey as keyof typeof innerObj];
      const pipeCount = (value.match(/\|/g) || []).length;
      const noSpaceBeforeParenthesis = (value.match(/\S\(/) || []).length > 0;
      if (pipeCount > 2) {
        console.log(`Too many pipes in ${outerKey}.${innerKey}: "${value}"`);
      }
      if (noSpaceBeforeParenthesis) {
        console.log(
          `Improper parentesis spacing in ${outerKey}.${innerKey}: "${value}"`
        );
      }
    }
  }
};

export const generateListOfCandidates = (city?: City) => {
  // Filter candidates by city:
  const candidateContent =
    city === "st-paul" ? candidateStpContent : candidateMplsContent;

  return Object.values(candidateContent)
    .sort((a, b) => (a.name > b.name ? 1 : -1)) // Sort alphabetically by name
    .map((candidate) => ({
      name: candidate.name,
      slug: kebabCase(candidate.name),
    }));
};

/**
 * This function takes our raw JSON content from `question-content.js`
 * and formats it into a organized JS object that keeps track of the quiz
 * questions and answers, joining on which candidates correspond to which
 * quiz question responses.
 */
export const formatQuestionContent = () => {
  const city = useCity();
  const candidates = formatCandidateContent(city);
  const findMatchingCandidates = (questionIndex: number, quizOption: string) =>
    candidates
      .filter((c) => c.responses[questionIndex].optionNumber === quizOption)
      .map((c) => ({
        name: c.name,
        quote: c.responses[questionIndex].quote,
        source: c.responses[questionIndex].source,
      }));
  const questonsArray = Object.values(questionContent).map((question, i) => ({
    ...question,
    number: i + 1,
    option1: {
      text: question.option1,
      matchingCandidates: findMatchingCandidates(i, "1"),
    },
    option2: {
      text: question.option2,
      matchingCandidates: findMatchingCandidates(i, "2"),
    },
    option3: {
      text: question.option3,
      matchingCandidates: findMatchingCandidates(i, "3"),
    },
    option4: {
      text: question.option4,
      matchingCandidates: findMatchingCandidates(i, "4"),
    },
    skipped: {
      matchingCandidates: findMatchingCandidates(i, "0").concat(
        candidates
          .filter((c) => !c.responses[i].optionNumber)
          .map((c) => ({
            name: c.name,
            quote: "",
            source: "",
          }))
      ),
    },
  }));

  return groupBy(questonsArray, "subject");
};

export type QuizInput = {
  questionNumber: number;
  answer: string | null;
};

export type ScoreCard = {
  candidateName: string;
  scoreList: { questionNumber: number; subject: string; points: number }[];
  totalScore: number;
  totalPossibleScore: number;
}[];

/**
 * This function creates a blank template to keep track of which
 * candidates match up with user responses most closely.
 *
 * TODO: Generate a Blank scorecard based on the city
 */
export const generateBlankScorecard = (): ScoreCard => {
  return Object.entries(candidateMplsContent).map((candidate) => {
    return {
      candidateName: candidate[1].name,
      scoreList: [],
      totalScore: 0,
      totalPossibleScore: 0,
    };
  });
};
