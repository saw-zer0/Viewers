export default (displaySet) => {

  const ViewPosition = displaySet?.images[0]?.ViewPosition;
  if (!ViewPosition) {
    return undefined;
  }
  return `${ViewPosition}`;
}
