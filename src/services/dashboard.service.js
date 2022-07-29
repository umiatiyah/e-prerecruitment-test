import http from "../http-common";
import authHeader from "./auth-header";

class DashboardService {
  count() {
    return http.get("/admin/dashboard", { headers: authHeader() });
  }
}

export default new DashboardService();
