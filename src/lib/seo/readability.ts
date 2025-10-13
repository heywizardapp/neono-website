/**
 * Readability analysis using Flesch Reading Ease formula
 * Higher scores = easier to read (90-100 = 5th grade, 60-70 = 8th-9th grade, 0-30 = college graduate)
 */

export interface ReadabilityResult {
  score: number;
  grade: string;
  interpretation: string;
  averageWordsPerSentence: number;
  averageSyllablesPerWord: number;
}

/**
 * Count syllables in a word (approximation)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  
  // Remove silent e
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  // Count vowel groups
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

/**
 * Split text into sentences
 */
function getSentences(text: string): string[] {
  // Remove markdown syntax
  const cleanText = text
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
    .replace(/>\s/g, ''); // Remove blockquotes
  
  // Split by sentence endings
  const sentences = cleanText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  return sentences;
}

/**
 * Split text into words
 */
function getWords(text: string): string[] {
  // Remove markdown and special characters
  const cleanText = text
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/[^a-zA-Z\s]/g, ' ');
  
  return cleanText
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 0);
}

/**
 * Calculate Flesch Reading Ease score
 * Formula: 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
 */
export function calculateReadability(content: string): ReadabilityResult {
  if (!content || content.trim().length === 0) {
    return {
      score: 0,
      grade: 'N/A',
      interpretation: 'No content to analyze',
      averageWordsPerSentence: 0,
      averageSyllablesPerWord: 0
    };
  }

  const sentences = getSentences(content);
  const words = getWords(content);
  
  if (sentences.length === 0 || words.length === 0) {
    return {
      score: 0,
      grade: 'N/A',
      interpretation: 'Insufficient content',
      averageWordsPerSentence: 0,
      averageSyllablesPerWord: 0
    };
  }

  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  const averageWordsPerSentence = words.length / sentences.length;
  const averageSyllablesPerWord = totalSyllables / words.length;

  // Flesch Reading Ease formula
  const score = Math.round(
    206.835 - 
    1.015 * averageWordsPerSentence - 
    84.6 * averageSyllablesPerWord
  );

  // Clamp score between 0-100
  const clampedScore = Math.max(0, Math.min(100, score));

  // Grade and interpretation
  let grade: string;
  let interpretation: string;

  if (clampedScore >= 90) {
    grade = '5th grade';
    interpretation = 'Very easy to read';
  } else if (clampedScore >= 80) {
    grade = '6th grade';
    interpretation = 'Easy to read';
  } else if (clampedScore >= 70) {
    grade = '7th grade';
    interpretation = 'Fairly easy to read';
  } else if (clampedScore >= 60) {
    grade = '8th-9th grade';
    interpretation = 'Standard/conversational';
  } else if (clampedScore >= 50) {
    grade = '10th-12th grade';
    interpretation = 'Fairly difficult';
  } else if (clampedScore >= 30) {
    grade = 'College level';
    interpretation = 'Difficult to read';
  } else {
    grade = 'College graduate';
    interpretation = 'Very difficult to read';
  }

  return {
    score: clampedScore,
    grade,
    interpretation,
    averageWordsPerSentence: Math.round(averageWordsPerSentence * 10) / 10,
    averageSyllablesPerWord: Math.round(averageSyllablesPerWord * 100) / 100
  };
}
