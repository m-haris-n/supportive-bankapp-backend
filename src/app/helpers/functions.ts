export function apiResponse(
  success: boolean = true,
  data: any = null,
  status: number = 200
) {
  return Response.json(
    { success: success, data: data, status: status },
    { status }
  );
}

export function getUserId(req: any) {
  return (req as any).user.userId;
}

export const generateOTP = (length: number = 6): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
};
