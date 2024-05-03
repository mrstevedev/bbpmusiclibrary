export default function AboutParagraph({ page }) {
  console.log("page:", page);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
    </>
  );
}
