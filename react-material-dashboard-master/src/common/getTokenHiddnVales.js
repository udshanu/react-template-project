export default {
    getHiddenValues(){
        var token = localStorage.getItem('token');
        if (token != null) {
            var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
            return {
                userRole: payload.role,
                UserName: payload.UserName,
                FirstName: payload.FirstName,
                LastName: payload.LastName
            }
        }
        else
        {
            return {
                userRole: '',
                UserName: '',
                FirstName: '',
                LastName: ''
            }
        }
        
    }
}