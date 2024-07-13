export const getSituation = (grades) => {
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    sum += grades[i];
  }
  const average = sum / grades.length;

  return average >= 7 && faults < 15;
};
