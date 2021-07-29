import { request, gql } from "graphql-request";

const mutate = (result) => gql`
  mutation {
    createComplition(data: { result: "${result}" }) {
      id
    }
  }
`;

export default async function handler(req, res) {
  try {
    request(process.env.CONTENT_API, mutate(req.body));
    res.json({icon: "success", msg: "Отлично 😎"})
  } catch (error) {
    res.json({icon: "error", msg: "Ошибка 🤬"})
  }
}
