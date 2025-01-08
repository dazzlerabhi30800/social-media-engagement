import ConfigFunc from "../config/ConfigFunc";

const ReplyComp = ({ reply }) => {
  const { formatTime } = ConfigFunc();
  return (
    <div className="flex flex-col gap-1 border-b-2 border-blue-300 p-2">
      <div className="flex items-center gap-3">
        <img
          src={reply.users.photoUrl.fileUrl}
          className="w-10 h-10 rounded-[50%] object-cover"
          alt={reply.users?.name}
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-xs text-darkGrey leading-none">
            {reply.users?.name}
          </h3>
          <p className="text-[8px] text-gray-600">{formatTime(reply.date)}</p>
        </div>
      </div>
      <div className="p-1 text-xs mt-1 border-b border-gray-300 font-medium text-darkGrey">
        {reply.replyString}
      </div>
    </div>
  );
};

export default ReplyComp;
