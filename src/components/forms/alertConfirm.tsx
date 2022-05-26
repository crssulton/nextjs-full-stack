type Props = {
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  desc?: string;
};

const AlertConfirm = ({ onClose, onConfirm, title, desc }: Props) => {
  return (
    <div
      className="custom-ui border border-secondary rounded p-3 bg-light"
      style={{ width: 400 }}
    >
      <h1>{title || "Are you sure?"}</h1>
      <p>{desc || "You want to delete this file?"}</p>
      <button
        onClick={onClose}
        className="btn btn-secondary"
        style={{ marginRight: 10 }}
      >
        Cancel
      </button>
      <button className="btn btn-danger" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );
};

export default AlertConfirm;
