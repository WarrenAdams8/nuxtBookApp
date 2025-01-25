export default function (description: string) {
  const strippedHtml = description.replace(/(<([^>]+)>)/gi, "");

  return strippedHtml;
}
