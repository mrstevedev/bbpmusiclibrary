export default function AboutParagraph({ page }) {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
    </>
  );
}
