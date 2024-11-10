export type BuildResult = {
    status: boolean;
    message?: string;
    buildResults?: {modules: string[], dependencies: string[], digest: number[]};
  }
  
export type PublishResult = {
    status: boolean;
    message?: string;
    functions?: any[];
  }
