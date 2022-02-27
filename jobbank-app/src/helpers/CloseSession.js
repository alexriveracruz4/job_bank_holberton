
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function closeSession() {
  if (cookies.get("student_id")) {
    cookies.remove("student_id", {path: "/"});
    cookies.remove("firstname", {path: "/"});
    cookies.remove("lastname", {path: "/"});
    cookies.remove("email", {path: "/"});
    cookies.remove("github", {path: "/"});
    cookies.remove('pres_or_remot', {path:"/"});
    cookies.remove('availability', {path:"/"});
    cookies.remove('phonenumber', {path:"/"});
    cookies.remove('age', {path:"/"});
    cookies.remove('nationality', {path:"/"});
    cookies.remove('description', {path:"/"});
    cookies.remove('disp_travel', {path:"/"});
    cookies.remove('linkedin', {path:"/"});
    cookies.remove('twitter', {path:"/"});
    cookies.remove('province', {path:"/"});
    cookies.remove('developer_type', {path:"/"});
    cookies.remove('english_level', {path:"/"});
    cookies.remove('video_link', {path:"/"});
    cookies.remove('portfolio', {path:"/"});
    cookies.remove('is_public', {path:"/"});
    cookies.remove('student_skills', {path:"/"});
    cookies.remove('token', {path:"/"});
    cookies.remove('created_at', {path:"/"});
    cookies.remove('updated_at', {path:"/"});
    cookies.remove('deleted_at', {path:"/"});
    cookies.remove('created_by', {path:"/"});
    cookies.remove('updated_by', {path:"/"});
    cookies.remove('deleted_by', {path:"/"});
    cookies.remove('deleted', {path:"/"});
    cookies.remove('cv_filename_physical', {path:"/"});
    cookies.remove('cv_filename_logical', {path:"/"});
    cookies.remove('photo_filename_physical', {path:"/"});
    cookies.remove('photo_filename_logical', {path:"/"});
    window.location.href="/home";
  } else if (cookies.get("partner_id")) {
    cookies.remove('partner_id', {path: "/"});
    cookies.remove('name', {path: "/"});
    cookies.remove('email', {path: "/"});
    cookies.remove('nation', {path: "/"});
    cookies.remove('region', {path:"/"});
    cookies.remove('description', {path:"/"});
    cookies.remove('phonenumber', {path:"/"});
    cookies.remove('web', {path:"/"});
    cookies.remove('token', {path:"/"});
    cookies.remove('created_at', {path:"/"});
    cookies.remove('updated_at', {path:"/"});
    cookies.remove('deleted_at', {path:"/"});
    cookies.remove('created_by', {path:"/"});
    cookies.remove('updated_by', {path:"/"});
    cookies.remove('deleted_by', {path:"/"});
    cookies.remove('deleted', {path:"/"});
    cookies.remove('logo_filename_physical', {path:"/"});
    cookies.remove('logo_filename_logical', {path:"/"});
    window.location.href="/home";
  } else if (cookies.get("admin_id")) {
    cookies.remove("admin_id", {path: "/"});
    cookies.remove("firstname", {path: "/"});
    cookies.remove("lastname", {path: "/"});
    cookies.remove("email", {path: "/"});
    cookies.remove('created_by', {path:"/"});
    cookies.remove('updated_by', {path:"/"});
    cookies.remove('deleted_by', {path:"/"});
    cookies.remove('photo_filename_physical', {path:"/"});
    cookies.remove('photo_filename_logical', {path:"/"});
    cookies.remove('deleted', {path:"/"});
    cookies.remove('token', {path:"/"});
    cookies.remove('created_at', {path:"/"});
    cookies.remove('updated_at', {path:"/"});
    cookies.remove('deleted_at', {path:"/"});
    window.location.href="/home";
  } else {
    window.location.href="/home";
  }
}

export { closeSession }