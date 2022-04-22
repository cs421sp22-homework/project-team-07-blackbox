from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.trainers import ChatterBotCorpusTrainer
import os

chatbot = ChatBot(
    'e-stylist KK',
    logic_adapters = [
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, I do not understand. I am still learning. Please contact styleBox@gmail.com for further assistance.',
            'maximum_similarity_threshold': 0.30
        }
    ],
             read_only = True,
             preprocessors=['chatterbot.preprocessors.clean_whitespace',
                            'chatterbot.preprocessors.unescape_html',
                           'chatterbot.preprocessors.convert_to_ascii']
)

directory = 'training_data'

for filename in os.listdir(directory):
    if filename.endswith(".txt"): # only pick txt file for training
        print('\n Chatbot training with '+os.path.join(directory, filename)+' file')
        training_data = open(os.path.join(directory, filename)).read().splitlines()
        trainer = ListTrainer(chatbot) # bot training
        trainer.train(training_data)
    else:
        continue

# user choose whether to train with English corpus data
# decision = input('Train chatbot with English corpus data? (Y/N): ')
#
# if decision == 'Y':
#     print('\n Chatbot training with English corpus data')
    trainer_corpus = ChatterBotCorpusTrainer(chatbot)
    trainer_corpus.train('chatterbot.corpus.english')

# name = input('Enter Your Name: ')
#
# print ('Welcome to Chatbot Service! Let me know how can I help you')
#
# while True:
#     request = input(name+':')
#
#     if request=="Bye" or request=='bye':
#         print('Bot: Bye')
#         break
#     else:
#         response=chatbot.get_response(request)
#         print('Bot: ', response)