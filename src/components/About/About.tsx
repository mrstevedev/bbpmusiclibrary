export default function About({ page }) {
  return <div dangerouslySetInnerHTML={{ __html: page.content }} />;
}
