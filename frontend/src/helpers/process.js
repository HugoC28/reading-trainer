const processExercise = (exerciseData) => {
  const processed = {};
  const images = {};

  for (const index in exerciseData) {
    images[`img${index}`] = exerciseData[index]["url"];
    processed[index] = {
      ...exerciseData[index],
      image: `img${index}.png`,
    };
  }

  return [processed, images];
};

export const processExerciseData = (data) => {
  switch (data["Type"]) {
    case "Vocabulary Building": {
      const [processedExercise, images] = processExercise(data["Exercise"]);
      return [
        {
          title: data["Title"],
          type: data["Type"],
          exercise: processedExercise,
        },
        images,
      ];
    }
    case "Patterned Text":
    case "Reading Comprehension": {
      const [processedExercise, images] = processExercise(data["Exercise"]);
      return [
        {
          title: data["Title"],
          type: data["Type"],
          exercise: processedExercise,
        },
        images,
      ];
    }
    default:
      console.log("Exercise type not recognized in preprocessing for upload");
      return;
  }
};

export const processPatientData = (data) => {
  return {
    ...data,
    age: parseInt(data.age, 10),
    difficulties: data.difficulties
      .split(",")
      .map((difficulty) => difficulty.trim()),
    interests: data.interests.split(",").map((interest) => interest.trim()),
  };
};
