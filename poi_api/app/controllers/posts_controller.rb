class PostsController < ApplicationController
  before_action :authenticate_user, only: [:update, :create, :destroy]
  before_action :set_post, only: [:update, :destroy]

  # GET /users/:user_id/posts
  # GET /cities/:city_id/posts
  def index
    if (params[:user_id])
      @posts = Post.where(user_id: params[:user_id])
    else
      @posts = Post.where(city_id: params[:city_id])
    end
    render json: @posts, include: :user
  end

  # GET /users/:user_id/posts/:id
  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  # POST /cities/:city_id/posts
  def create
    @new_post = Post.new(post_params)
    
    if @new_post.save
      render json: @new_post, status: :created, location: @new_post
    else
      render json: @new_post.errors, status: :unprocessable_entity
    end
  end

  # PUT /users/:user_id/posts/:id
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id/posts/:id
  def destroy
    @post.destroy
    render json: { message: "Post id: #{params[:id]} has been deleted"}
  end


  private

    def set_post
      @post = Post.find(params[:id])
    end
    
    def post_params
      params
      .require(:body)
      .permit(
        :content, :poi_id, :city_id, :user_id
        )
    end
  end

