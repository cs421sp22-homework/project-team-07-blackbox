from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

chatbot = ChatBot(
    'e-stylist KK',
    logic_adapters = [
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, I do not understand. I am still learning. Please contact styleBox@gmail.com for further assistance.',
            'maximum_similarity_threshold': 0.30
        }
    ]
)

trainer = ListTrainer(chatbot)

trainer.train([
    "Hi there!",
    "Hello",
])

trainer.train([
    "Hi, can I help you",
    "Who are you?",
    "I am your virtual assistant. Ask me any questions...",

])


trainer.train([
    "What is your name?",
    "KK"
])

trainer.train([
    "Your name?",
    "KK"
])

trainer.train([
    "Name?",
    "KK"
])

# trainer.train([
#     "Payment",
#     "We support debit card and credit card."
# ])

trainer.train([
    "What payment do you support?",
    "We support debit card and credit card."
])

# trainer.train([
#     "How to place order?",
#     "You can find a stylist first and then place order at they on their homepage."
# ])

trainer.train([
    "How should I place order?",
    "You can find a stylist first and then place order at they on their homepage."
])

trainer.train([
    "How can I place order",
    "You can find a stylist first and then place order at they on their homepage."
])



# trainer.train([
#     "Payment",
#     "We support debit card and credit card."
# ])


trainer.train([
    "Bye",
    "Bye"
])

trainer.train([
    "Greetings!",
    "Hello",
])