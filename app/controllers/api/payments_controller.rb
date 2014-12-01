class Api::PaymentsController < ApiController
  # before_filter :parse_date, only: [:create, :update]

  # GET /payments
  def index
    payments = current_user.payments
    render json: payments, root: false
  end

  # POST /payments
  def create
    payment = Payment.new(payment_params.merge(user_id: current_user.id))
    if payment.save
      render json: payment, root: false, status: :created
    else
      render json: { errors: payment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /payments/:id
  def show
    payment = Payment.find(params[:id])
    render json: payment, root: false
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e.message }, status: :not_found
  end

  # PUT /payments/:id
  def update
    payment = Payment.find(params[:id])
    if payment.update(payment_params)
      render json: payment
    else
      render json: { errors: payment.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e.message }, status: :not_found
  end

  # DELETE /payments/:id
  def destroy
    payment = Payment.find(params[:id])
    payment.destroy
    render json: payment
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e.message }, status: :not_found
  end

  private

  def parse_date
    params[:date] = Date.strptime(params[:date], '%m/%d/%Y')
  end

  def payment_params
    params.permit(:amount_cents, :client_id, :note, :payment_type, :date)
  end
end