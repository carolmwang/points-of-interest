class PostsController < ApplicationController
  before_action :authenticate_user, only: [:update, :create, :destroy]
  before_action :set_post, only: [:update, :destroy]

  # GET /posts
  def index
    if (params[:user_id])
      @posts = Post.where(user_id: params[:user_id])
    else
      @posts = Post.where(city_id: params[:city_id])
    end
    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @new_post = Post.new(post_params)

    if @new_post.save
      render json: { post: @new_post, status: :created, location: @new_post }
    else
      render json: { post: @new_post.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: { errors: @post.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
    render json: { message: "Post id: #{params[:id]} has been deleted"}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params
      .require(:data)
      .require(:attributes)
      .permit(
        :content, :poi_id, :city_id, :user_id
        )
    end
end
