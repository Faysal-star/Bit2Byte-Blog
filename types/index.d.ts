export interface User {
    username: string;
    fullname: string;
    email: string;
    profile_pic: string | null;
    access_token: string;
    role: string;
    is_email_verified: boolean;
}

export interface Quiz {
    title: string;
    description: string;
    quiz_id: number;
    number_of_questions: number;
    duration_in_min: number;
    start_time: string;
    total_attempts?: number;
}

export interface QuizInput {
    title: string;
    description: string;
    number_of_questions: number;
    duration: number; // Duration in minutes
    start_time: string; // ISO date string or formatted date
    questions: QuestionInput[];
}

export interface QuizIdInput {
    quiz_id: number;
}

export interface QuestionInput {
    question_text: string;
    correct_answer: string;
    score: number;
    options: string[];
}

export interface QuestionWithIdInput {
    question_id: number;
    quiz_id: number;
    question_text: string;
    correct_answer: string;
    score: number;
    options: string[];
}

export interface Question extends QuestionWithIdInput {

}

export interface QuizWithIdQuestionsInput {
    quiz_id: number;
    questions: QuestionInput[];
}

export interface ResultInput {
    question_id: number;
    selected_option: string;
}

export interface FullResponseInput {
    quiz_id: number;
    answers: ResultInput[];
}

export interface QuizListResponse {
    quizzes: Quiz[];
    totalPages?: number;
    currentPage?: number;
    totalItems?: number;
}

export interface QuestionListResponse {
    questions: Question[];
    totalPages?: number;
    currentPage?: number;
    totalItems?: number;
}

export interface QuizResponse {
    quiz: Quiz;
    questions?: Question[];
}

export interface QuizSubmissionResult {
    quiz_id: number;
    total_score: number;
    max_score: number;
    percentage: number;
    correct_answers: number;
    total_questions: number;
    results: {
        question_id: number;
        selected_option: string;
        correct_answer: string;
        is_correct: boolean;
        score_earned: number;
        max_score: number;
    }[];
}

export interface QuizStats {
    total_quizzes: number;
    active_quizzes: number;
    completed_quizzes: number;
    upcoming_quizzes: number;
}

export interface QuizFilters {
    page?: number;
    item_per_page?: number;
    status?: 'active' | 'completed' | 'upcoming';
    search?: string;
}

export type QuizStatus = 'upcoming' | 'active' | 'completed' | 'expired';

export interface ExtendedQuiz extends Quiz {
    status: QuizStatus;
    end_time: number;
    is_active: boolean;
    is_expired: boolean;
    time_remaining?: number;
}

export interface CreateQuizForm {
    title: string;
    description: string;
    duration: number;
    start_time: string;
    questions: Omit<QuestionInput, 'quiz_id'>[];
}

export interface UpdateQuizForm extends Partial<CreateQuizForm> {
    quiz_id: number;
}

export interface CreateQuestionForm extends QuestionInput {
    quiz_id: number;
}

export interface UpdateQuestionForm extends QuestionWithIdInput { }

export interface ApiErrorResponse {
    error: string;
    message: string;
    status: number;
    timestamp: string;
}

export interface ApiSuccessResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
    timestamp: string;
}