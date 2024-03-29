//widget.h
#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QWebEngineView>
#include <QApplication>
#include <QDir>
#include <QUrl>
#include <QWebChannel>
#include <QGuiApplication>
#include <QRect>
#include <QScreen>
#include <QFileDialog>
#include <QPixmap>
#include <QPrinter>
#include <QPaintEngine>
#include <QPainter>
#include <QTextDocument>
#include <QTextStream>
#include <QMenu>
#include <QMessageBox>
#include <QPdfWriter>
#include <QDesktopServices>
#include <QTextDocument>
#include <QDebug>
#include <QMenuBar>
#include <QMenu>
#include <QPushButton>
#include <QKeySequence>
#include <QWebEngineScript>
QT_BEGIN_NAMESPACE
namespace Ui { class Widget; }
QT_END_NAMESPACE

class Widget : public QWidget
{
    Q_OBJECT
public:
    Widget(QWidget *parent = nullptr);
    ~Widget();
private slots:
//    void Grabwindow();
//    void Gethtml();
public slots:
    void preview(QString);
    void print();
    void backtopage();
private:
    Ui::Widget *ui;
    QWebEngineView* m_pWebEngineView;
    QWebEnginePage* page;
    QWebEnginePage* page2;
    QPushButton* button;
    QPushButton* button2;
    QScreen* screen;
    QString path;
};
#endif // WIDGET_H
