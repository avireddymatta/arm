import { prisma } from "@/lib/utils/prisma";
import UserTask from "./userTask";

const Task = async () => {

    // const session = await getServerSession(authOptions);
  let tasks = await prisma.tasks.findMany();
  return (
    <div className="flex gap-2 p-6">
        <UserTask />
        {
            tasks.length > 0 && (
                tasks.map(task => (
                    <div key={task.Id} className="grid gap-3 bg-white rounded-lg shadow-lg p-6">
                        <span>{task.Name}-{task.Description}</span>
                        <span>Status: {task.Status ? "Completed": "InProgress"}</span>
                        <span>{task.CreatedAt.toDateString()}</span>
                    </div>
                ))
            )
        }
    </div>
  );
}


export default Task;