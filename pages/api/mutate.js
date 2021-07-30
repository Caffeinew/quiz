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
    await request(process.env.CONTENT_API, mutate(req.body));
    res.status(200).json({icon: "success", msg: "Отлично 😎"})
  } catch (error) {
    res.status(500).json({icon: "error", msg: "Ошибка 🤬"})
  }
}
