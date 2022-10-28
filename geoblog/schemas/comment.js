export default {
  name: "comment",
  type: "document",
  title: "Comment",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "comment",
      type: "string",
    },
    {
      title: "Approved",
      name: "approved",
      type: "boolean",
      description:
        "Comments won't be made publicly available until the approval is done",
    },
    {
      name: "post",
      type: "reference",
      to: [{ type: "post" }],
    },
  ],
};
