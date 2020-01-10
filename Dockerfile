FROM ruby:2.7.0
RUN apt-get update -qq && apt-get install -y build-essential nodejs libpq-dev postgresql-client
RUN mkdir -p /todoapp/backend
WORKDIR /todoapp/backend
COPY Gemfile /todoapp/backend/Gemfile
COPY Gemfile.lock /todoapp/backend/Gemfile.lock
RUN bundle install
COPY . /todoapp/backend

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]