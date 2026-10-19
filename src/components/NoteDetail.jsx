export default function NoteDetail({ title, content }) {
  return (
    <div className="border m-4 p-4 flex justify-between items-center">
      <div>
        <p>{title}</p>
        <p>{content}</p>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </div>
  );
}
