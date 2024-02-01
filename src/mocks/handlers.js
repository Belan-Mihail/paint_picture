// 122 setupTests.js
// 121
import { rest } from "msw";

const baseURL = "https://paint-picture-backend-6b0b98f6459e.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 8,
        username: "Mike1",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 8,
        profile_image:
          "https://res.cloudinary.com/dtnxukqxl/image/upload/v1/media/images/RSAU7543_us8wdy",
      })
    );
  }),

  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
