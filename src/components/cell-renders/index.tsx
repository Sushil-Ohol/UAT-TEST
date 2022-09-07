export function IdLinkComponent(props: any) {
  const { value, link } = props;
  return (
    <a target="_blank" rel="noopener noreferrer" href={link}>
      {value}
    </a>
  );
}
