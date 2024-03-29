//widget.cpp
#include "widget.h"
#include "ui_widget.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)
{
    ui->setupUi(this);
    this->setWindowTitle("简历生成器");
    QRect deskrect;
    screen = QGuiApplication::primaryScreen();
    deskrect = screen-> geometry();//读取桌面分辨率
    int wid = deskrect.width();
    int hei = deskrect.height();
    this->resize(wid - 300,hei - 100);
    this->move(200,100);
    this->showMaximized();//全屏
    m_pWebEngineView = new QWebEngineView(this);
    page = new QWebEnginePage(this);
    m_pWebEngineView->setPage(page);
    path = QDir::currentPath();//读取工作目录绝对路径
    QString str = path + "/resume_generator.html";
    m_pWebEngineView->page()->load(str);
    QWebChannel* channel = new QWebChannel;
    channel->registerObject("QTWindow",this);
    m_pWebEngineView->page()->setWebChannel(channel);
    m_pWebEngineView->resize(wid,hei);
    m_pWebEngineView->show();
}
//void Widget::Grabwindow()
//{
//    QPixmap pixmap = this->grab();
//    QString fileName(tr("ok.txt")) ;
//    QString dir = QFileDialog::getSaveFileName(this, tr("保存图片"),
//                                                      "/简历生成器",
//                                                     tr("Images (*.png)"));

//    if(!pixmap.save(dir,"png"))
//    {
//         qDebug()<<"error";
//    }
//}
//void Widget::Gethtml()
//{
    
//    QString _html = QDir::currentPath();//读取工作目录绝对路径
//    _html += "/resume_generator.html";
//        QFile file(_html);
//        file.open(QIODevice::ReadOnly);
//        QTextStream in(&file);
//        QString str = in.readAll();
//        file.close();
//        qDebug()<<str;
//        QTextDocument* doc = new QTextDocument();
//        doc->setHtml(str);
//        QPrinter printer(QPrinter::HighResolution);
//        printer.setPageSize(QPrinter::A4);
//        printer.setOutputFormat(QPrinter::PdfFormat);
//        printer.setOutputFileName("D://test.pdf");
//        doc->print(&printer);
//}
void Widget::preview(QString str)
{
    QString str1 = path + "/test1.html";
    QDir dir;
    QFile file(str1);
    if(!dir.exists(str1))
    {
        file.open(QIODevice::ReadWrite);
    }
    QTextStream stream(&file);
    stream << str;
    file.close();
    //qDebug() << str;
    page2 = new QWebEnginePage(m_pWebEngineView);
    m_pWebEngineView->setPage(page2);
    page2->load(str1);
    button = new QPushButton;
    button2 = new QPushButton;
    button->setParent(m_pWebEngineView);
    QRect rect = screen->geometry();
    button->resize(rect.width()/20,rect.height()/20);
    button->move(rect.width()/1.5,rect.height()/3);
    button->setText("确定保存");
    connect(button,&QPushButton::clicked,this,&Widget::print);
    button->show();
    button2->setParent(m_pWebEngineView);
    button2->resize(rect.width()/20,rect.height()/20);
    button2->move(rect.width()/1.5,rect.height()/2.5);
    button2->setText("取消");
    connect(button2,&QPushButton::clicked,this,&Widget::backtopage);
    button2->show();
}
void Widget::print()
{
    QString str = QFileDialog::getSaveFileName(this,tr("Save_PDF"),"/简历生成器",tr("*.pdf"));
    if(str.isEmpty())
        return;
    QPrinter* printer = new QPrinter;
    QPagedPaintDevice::Margins marg; marg.left = 0; marg.right = 0; marg.top = 0; marg.bottom = 0;
    printer->setMargins(marg);
    printer->setFullPage(true);
    QTextDocument* doc = new QTextDocument();

    page2->print(printer,[=](bool ok){if(!ok)qDebug()<<"false";});
    printer->setOutputFormat(QPrinter::PdfFormat);
    printer->setPageSize(QPrinter::A4);
    printer->setOutputFileName(str);
    doc->print(printer);
    backtopage();
}
void Widget::backtopage()
{
    m_pWebEngineView->setPage(page);
    delete button;
    delete button2;
    QString str = path + "/test1.html";
    QFile::remove(str);
}
Widget::~Widget()
{
    delete ui;
    QString str = path + "/test1.html";
    QFile::remove(str);
}

