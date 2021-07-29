import { request, gql } from "graphql-request";
import Head from "next/head";
import Swal from "sweetalert2";

const query = gql`
  {
    categories {
      name
      id
    }
    questions {
      title
      description
      id
      category {
        id
      }
    }
  }
`;

export async function getServerSideProps() {
  const data = await request(process.env.CONTENT_API, query);

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  async function submit(event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/mutate", {
      method: "POST",
      body: JSON.stringify(formData).replaceAll(/[{}"]/g, ""),
    });
    const data = await res.json()
    console.log(data)
    Swal.fire({
      title: data.msg,
      icon: data.icon,
    });
  }
  return (
    <div className="max-w-screen-xl mx-auto py-16">
      <Head>
        <title>Опрос | Prizmarine Agency</title>
      </Head>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-medium leading-6 text-gray-900">
            Предложения
          </h3>
          <p className="mt-1 text-lg text-gray-600">Возвожные варианты услуг</p>
        </div>

        <div className="mt-5">
          <form action="#" method="POST" onSubmit={submit} id="form">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {data.categories.map((category) => (
                  <fieldset key={category.id}>
                    <legend className="text-base font-medium text-gray-900">
                      {category.name}
                    </legend>
                    <div className="mt-4 space-y-4">
                      {data.questions.map(
                        (question) =>
                          question.category.id === category.id && (
                            <div className="flex items-start" key={question.id}>
                              <div className="flex items-center h-5">
                                <input
                                  name={question.title}
                                  type="checkbox"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor={question.title}
                                  className="font-medium text-gray-700"
                                >
                                  {question.title}
                                </label>
                                <p className="text-gray-500">
                                  {question.description}
                                </p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </fieldset>
                ))}
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Готово
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
