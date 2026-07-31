const slugify = (input: String) => {
  return input.trim().toLowerCase().replaceAll(" ", "-");
};

export default slugify;
