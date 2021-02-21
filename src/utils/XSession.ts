import { Service } from "@kaviar/core";
import { BlueprintWriterSession } from "@kaviar/terminal-bundle";
import { FSUtils } from "./FSUtils";

@Service({
  transient: true,
})
export class XSession extends BlueprintWriterSession {
  protected microservicePath: string;
  protected projectPath: string;

  getMicroservicePath(): string {
    return this.microservicePath || FSUtils.getNearest("microservice");
  }

  getProjectPath(): string {
    return this.projectPath || FSUtils.getNearest("project");
  }

  setMicroservicePath(path: string) {
    this.microservicePath = path;
  }

  getProjectName(): string {
    return FSUtils.getProjectName(this.getProjectPath());
  }

  setProjectPath(path: string) {
    this.projectPath = path;
  }
}
