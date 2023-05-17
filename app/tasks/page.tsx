import type { Tasks } from "@prisma/client";
import { prisma } from "../utils/prisma";
import getCurrentUser from "../utils/getCurrentUser";

const TaskList = async() => {

    const currentUser = await getCurrentUser();
    const tasksList = await prisma.tasks.findMany({
        where: {UserId: currentUser?.Id}
    });

    return (
        <div className="flex gap-6 flex-wrap">
            {
                tasksList && tasksList.map(task => {
                    return <div key={task.Id} className="grid items-center justify-between grid-rows-2  rounded-lg shadow-lg bg-white p-5">
                        <div className="flex justify-between items-center gap-10 mb-4">
                            <span>{task.Name} </span>
                            <span>{task.Status} </span>
                        </div>
                        <div>
                            {task.Description}
                        </div>
                    </div>
                })
            }
        </div>
    )

}


export default TaskList;