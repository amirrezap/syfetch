
import { SyfetchInterface } from '@/handlers/types';

type QueryStateValue = { request: SyfetchInterface, response: Response }

class QueryState {
  private state: Map<string, QueryStateValue> = new Map();

  setQuery(apiPath: string, properties: SyfetchInterface, response: Response): void {
    this.state.set(apiPath, {
      request: properties,
      response,
    });
  }

  getQuery(apiPath: string): QueryStateValue | undefined {
    return this.state.get(apiPath);
  }

  clearQuery(apiPath: string): boolean {
    return this.state.delete(apiPath);
  }

  clearAll(): void {
    this.state.clear();
  }
}

export const queryState = new QueryState();
