import {CHANGE_LANGUAGE} from '../type';
const initialState = {
  SelectLanguageName: 'English',
  SelectLanguage: {
    To_Do_List: 'To-Do List',
    organize_task:
      'Organize your tasks, stay on track, and conquer your day, one checkmark at a time!',
    AdNotes: 'Ad Notes',
    quickly_jot_down:
      'Quickly jot down your ideas, tasks, and reminders all in one place!',
    Calender: 'Calendar',
    stay_organized:
      'Stay organized by scheduling and tracking all your events, tasks',
    conitnue: 'Continue',
    TaskNexus: 'TaskNexus',
    no_notes: 'No Notes',
    you_havent_create_any_note_yet: `You haven't created any note yet!`,
    create_note: 'Create Note',
    search: 'Search',
    Notes: 'Notes',
    Todo: 'Todo',
    Calender: 'Calender',
    Setting: 'Setting',
    Todo: 'Todo',
    no_todo_found: 'No Todo founds',
    privacy_policy: 'Privacy Policy',
    RateUs: 'Rate Us',
    Share_App: 'Share App',
  },
};

export const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        SelectLanguageName: action.payload.SelectLanguageName,
        SelectLanguage: action.payload.SelectLanguage,
      };
    default:
      return state;
  }
};
