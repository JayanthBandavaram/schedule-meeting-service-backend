import { Op } from "sequelize";
import Meeting from "../model/meeting.model.js";

const hasConflict = async ({ userId, startTime, endTime, excludeId }) => {
  return Meeting.findOne({
    where: {
      userId,
      ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
};

export default hasConflict;
