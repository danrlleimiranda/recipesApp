type PageTitleProps = {
  icon: string
  title: string
};

function PageTitle({ icon, title }: PageTitleProps) {
  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 1rem',
      } }
    >
      <img src={ icon } alt="Icon" />
      <h1>{title}</h1>
    </div>
  );
}
export default PageTitle;
