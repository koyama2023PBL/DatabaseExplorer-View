import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import instance from "../../axios/axiosInstance";
import { getDate, DateTostring } from "../Common/Util";

interface PostgresProcessApiRequest {
  startTime: Date;
  endTime: Date;
}

interface PostgresProcessApiResponse {
  starttime: string;
  endtime: string;
  masterProcess: boolean;
  walWriter: boolean;
  writer: boolean;
  checkPointer: boolean;
  statisticsCollector: boolean;
  autoVacuumLauncher: boolean;
  autoVacuumWorker: boolean;
  backendProcess: boolean;
}

const fetchFromAPIwithRequest = async (
  endpoint: string,
  queryParameters: PostgresProcessApiRequest
) => {
  try {
    const startTimeString = getDate(queryParameters.startTime);
    const endTimeString = getDate(queryParameters.endTime);

    const response = await instance.get<PostgresProcessApiResponse>(
      `${endpoint}?starttime=${startTimeString}&endtime=${endTimeString}`
    );
    return response.data;
  } catch (err) {
    console.log("err:", err);
    throw err;
  }
};

const PostgresProcessStatus: React.FC = () => {
  const [postgresProcessStatus, setPostgresProcessStatus] = useState<PostgresProcessApiResponse | null>(null);

  useEffect(() => {
    const fetchProcessStatus = async () => {
      const endpoint = "/database-explorer/api/visualization/processes";
      const requestBody: PostgresProcessApiRequest = {
        startTime: new Date("2023-05-07T18:00:00"),
        endTime: new Date("2023-05-07T18:10:00"),
      };

      const response = await fetchFromAPIwithRequest(endpoint, requestBody);
      setPostgresProcessStatus(response);
    };

    fetchProcessStatus();
  }, []);

  return (
    <Card>
      <CardContent>
        {postgresProcessStatus ? (
          <>
            <Typography variant="h6" component="div" align="left">
              主要プロセス確認
            </Typography>
            <Typography variant="body2" component="div" align="left">
              Master Process: {postgresProcessStatus.masterProcess ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2" component="div" align="left">
              WAL Writer: {postgresProcessStatus.walWriter ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2" component="div" align="left">
              Writer: {postgresProcessStatus.writer ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2" component="div" align="left">
              CheckPointer: {postgresProcessStatus.checkPointer ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2" component="div" align="left">
              Statistics Collector: {postgresProcessStatus.statisticsCollector ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2" component="div" align="left">
              AutoVacuum Launcher: {postgresProcessStatus.autoVacuumLauncher ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2" component="div" align="left">
              AutoVacuum Worker: {postgresProcessStatus.autoVacuumWorker ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body2" component="div" align="left">
              Backend Process: {postgresProcessStatus.backendProcess ? "Active" : "Inactive"}
              </Typography>
          </>
          ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PostgresProcessStatus;
