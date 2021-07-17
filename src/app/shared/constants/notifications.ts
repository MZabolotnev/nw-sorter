export const NOTIFICATIONS = {
  SUCCESS: {
    DONE: {
      TITLE: 'Done',
      MESSAGE: 'Files processed',
    },
  },
  ERROR: {
    READ_FOLDER: {
      TITLE: 'Read folder error',
    },
    EMPTY_FOLDER: {
      TITLE: 'Folder is empty!',
      MESSAGE: 'Select non-empty folder!',
    },
    SEARCH_FILES: {
      TITLE: 'Files search error',
    },
    NO_FILES: {
      MESSAGE:
        'No files found. Try to change filenames input, or check select all.',
    },
    PARSE_STR: {
      MESSAGE: "Can't parse the filenames string.",
    },
    PROCESS: {
      TITLE: 'Process files error',
    },
  },
  WARNING: {
    PREVIEW: {
      TITLE: 'Error with preview, file: ',
    }
  },
};
