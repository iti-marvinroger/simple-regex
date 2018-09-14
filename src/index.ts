export const matchRegex = (regex: string, candidate: string) => {
  const match = (regex: string) => {
    for (var i = 0; i < candidate.length; i++) {
      if (matchHere({ regex, regexIndex: 0, candidateIndex: i })) {
        return true
      }
    }

    return false
  }

  interface IMatchHereParams {
    regex: string
    regexIndex: number
    candidateIndex: number
  }

  const matchHere = ({ regex, regexIndex, candidateIndex }: IMatchHereParams): boolean => {
    // if we reached the end, it's a match
    if (regexIndex === regex.length) {
      return true
    }

    // handle *
    if (regex[regexIndex + 1] === '*') {
      return matchStar({
        regex,
        starChar: regex[regexIndex],
        regexIndex: regexIndex + 2,
        candidateIndex,
      })
    }

    if (candidateIndex !== candidate.length && regex[regexIndex] === candidate[candidateIndex]) {
      return matchHere({ regex, regexIndex: regexIndex + 1, candidateIndex: candidateIndex + 1 })
    }

    return false
  }

  interface IMatchStarParams {
    regex: string
    starChar: string
    regexIndex: number
    candidateIndex: number
  }

  const matchStar = ({ regex, starChar, regexIndex, candidateIndex }: IMatchStarParams) => {
    if (matchHere({ regex, regexIndex, candidateIndex })) {
      return true
    }

    candidateIndex++
    while (candidateIndex !== candidate.length && candidate[candidateIndex] === starChar) {
      if (matchHere({ regex, regexIndex, candidateIndex })) {
        return true
      }
      candidateIndex++
    }

    return false
  }

  const splittedRegex = regex.split('|')
  for (const regex of splittedRegex) {
    if (match(regex)) {
      return true
    }
  }

  return false
}
