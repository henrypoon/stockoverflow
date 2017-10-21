class Api::UsersController < Api::BaseController
	before_action :authenticate_user!, only: [:update]

	def update
		@user = User.find(params[:id])
		return api_error(status: 403) if !UserPolicy.new(current_user, @user).update?
		@user.update_attributes(update_params)
	end

	def show
    	@user = User.find(params[:id])
    end

    private 

	def update_params
		params.require(:user).permit(:name)
	end
end
