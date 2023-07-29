import { deleteMessageFromChannel } from "../_utils";
import { leadershipUsers } from "../_constants";

export async function handle_message(req, res) {
  let messageEvent = req.body.event;
  console.log(messageEvent);

  try {
      if (leadershipUsers.includes(messageEvent.user)) {
        deleteMessageFromChannel("announcements", res, messageEvent.ts)
      }
  }
  catch (e) {
      console.log(e)
  }
}