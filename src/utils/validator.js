export const validateMovie = movieInfo => {
  const {
    title,
    storyLine,
    tags,
    cast,
    releaseDate,
    genres,
    type,
    language,
    status,
  } = movieInfo;

  if (!title.trim()) return { error: "Title is missing!" };
  if (!storyLine.trim()) return { error: "Story Line is missing!" };

  // validation for tags we are checking if tags is an array or not
  if (!tags.length) return { error: "Tags is missing!" };

  // we are checking tags needs to fields with string value
  for (let tag of tags) {
    if (!tag.trim()) return { error: "Invalid tags!" };
  }

  // validation for cast we are checking if cast is an array or not
  if (!cast.length) return { error: "Cast and crew are missing!" };

  // we are checking cast needs to fields with string value
  for (let c of cast) {
    if (typeof c !== "object") return { error: "Invalid cast!" };
  }

  if (!releaseDate.trim()) return { error: "Release Date is missing!" };

  // validation for genres we are checking if genres is an array or not
  if (!genres.length) return { error: "Genres is missing!" };

  // we are checking genres needs to fields with string value
  for (let gen of genres) {
    if (!gen.trim()) return { error: "Invalid genres!" };
  }

  if (!type.trim()) return { error: "Type is missing!" };
  if (!language.trim()) return { error: "Language is missing!" };
  if (!status.trim()) return { error: "Status is missing!" };

  return { error: null };
};
