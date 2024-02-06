import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import TaskCreation from "../task";
import UserCreation from "../user";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TaskManagement() {
  const state = useLocation();
  const projectName = state?.state?.projectName;
  const projectId = state?.state.projectId;
  const navigate = useNavigate();

  return (
    <div className="p-4 w-[100%]">
      <div className="mb-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 w-2 h-2 rounded-full"></div>
            <div
              onClick={() => {
                navigate("/home");
              }}
              className="text-gray-500 cursor-pointer"
            >
              Project
            </div>
            <div className="mx-2 text-gray-500 font-bold">&#62;</div>
            <h2 className="text-blue-500">{projectName}</h2>
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultValue="task" className="w-full">
          <TabsList className="flex w-[200px]">
            <TabsTrigger className="flex flex-1" value="task">
              Task
            </TabsTrigger>
            <TabsTrigger className="flex flex-1" value="user">
              User
            </TabsTrigger>
          </TabsList>
          <TabsContent value="task">
            <TaskCreation projectId={projectId} />
          </TabsContent>
          <TabsContent value="user">
            <UserCreation projectId={projectId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
