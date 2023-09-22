type ProfileOptionProps = {
  icon: string;
  title: string;
};

function ProfileOption({ icon, title }: ProfileOptionProps) {
  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1rem',
        width: '12rem',
        padding: '0.225rem',
        border: '1px solid black',
      } }
    >
      <img src={ icon } alt="icon" />
      <span>{title}</span>
    </div>
  );
}
export default ProfileOption;
