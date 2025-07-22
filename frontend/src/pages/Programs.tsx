import bookIcon from "../assets/book.svg";
import { useApp } from "../contexts/AppContext";

function Programs() {
  const { appData } = useApp();

  if (!appData) {
    if (!appData) {
      return <div>Loading courses and majors...</div>;
    }
  }

  return (
    <>
      <div className="flex h-full">
        <div
          className="fixed w-72 flex flex-col bg-white border-gray-200 border-r-4 z-10"
          style={{ height: "calc(100vh - var(--navbar-height, 64px))" }}
        >
          <input
            type="text"
            placeholder="Search by major or certificate..."
            className="px-4 py-2 border-b-4 border-gray-200 bg-blue-100 placeholder-shown:bg-white w-full focus:outline-none focus:bg-gray-100
             transition-colors duration-200 ease-in-out border-t-2"
          />
          <div className="overflow-y-auto flex-1 pb-2">
            <ul className="flex flex-col w-full">
              {appData.major_templates.map((major_template, index) => (
                <li key={index}>
                  <div
                    className={`m-0 p-2  cursor-pointer transition-colors duration-200 hover:bg-blue-200 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    {major_template.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ml-72 flex-1 overflow-y-auto">
          <header className="m-6 mt-4 flex flex-col">
            <div className="flex flex-row gap-2 items-center">
              <h1 className="text-3xl font-bold text-gray-800">
                Program Viewer
              </h1>
              <img src={bookIcon} alt="pencil icon" className="h-8 w-8 ml-1" />
            </div>
            <p className="text-gray-500 font-medium mt-2">
              Welcome to the Program Viewer page! Search through majors and
              certificates, and add them to your profile!
            </p>
          </header>
          <hr className="border-gray-200 border-t-3" />
          <div className="p-4 m-6">
            THIS IS WHERE THE MAJOR TEMPLATE VIEW GOES
          </div>
        </div>
      </div>
    </>
  );
}

export default Programs;
