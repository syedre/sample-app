import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "../components/app-sidebar";
import { Panda, SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const DashboardPage = () => {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
          <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
            <div className="flex justify-between items-center w-full">
              <Panda className="h-8 w-8 text-black" />

              <div>
                <InputGroup>
                  <InputGroupInput placeholder="Search..." />
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>
        </header>
        <div className="flex flex-1">
          <AppSidebar />
          {/* <SidebarTrigger /> */}
        </div>
      </SidebarProvider>
    </div>
  );
};
export default DashboardPage;
