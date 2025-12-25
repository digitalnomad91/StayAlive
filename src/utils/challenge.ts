// ✨ Challenge helpers keep the check-in logic reusable across screens.
export type Challenge = {
  prompt: string;
  answer: string;
};

export const buildChallenge = (): Challenge => {
  const left = Math.floor(Math.random() * 8) + 2;
  const right = Math.floor(Math.random() * 8) + 2;
  return {
    prompt: `${left} + ${right} = ?`,
    answer: String(left + right),
  };
};
