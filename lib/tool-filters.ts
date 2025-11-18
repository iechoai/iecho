const CATEGORY_UI_TO_PARAM: Record<string, string | undefined> = {
  all: undefined,
  chatbots: "chatbots",
  "note-taking": "note",
  studying: "study",
  tools: "tool",
  scheduling: "schedule",
  tutorials: "tutorial",
  documentation: "doc",
  prompting: "prompt",
  productivity: "productivity",
  "no-code": "no-code",
  extensions: "extension",
  resources: "book",
  games: "gam",
};

// This is used to map UI category names to the corresponding
// category parameters used in the backend.
const CATEGORY_PARAM_TO_UI = Object.entries(CATEGORY_UI_TO_PARAM).reduce(
  (acc, [uiValue, paramValue]) => {
    if (paramValue) {
      acc[paramValue] = uiValue;
    }
    return acc;
  },
  {} as Record<string, string>
);
// The mapCategoryUiToParam function converts a category name from the UI
// to the corresponding parameter name used in backend queries.
export const mapCategoryUiToParam = (uiCategory: string): string | undefined => {
  return CATEGORY_UI_TO_PARAM[uiCategory] ?? uiCategory;
};

//The mapCategoryParamToUi function converts a category parameter from the backend
// to the corresponding name used in the UI.
export const mapCategoryParamToUi = (paramCategory?: string | null): string => {
  if (!paramCategory) {
    return "all";
  }
  return CATEGORY_PARAM_TO_UI[paramCategory] ?? paramCategory;
};
