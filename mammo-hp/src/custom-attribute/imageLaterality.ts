export default (displaySet) => {

  const ImageLaterality = displaySet?.images[0]?.ImageLaterality;
  if (!ImageLaterality) {
    return undefined;
  }
  return `${ImageLaterality}`;
}
